import { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as Notifications from "expo-notifications";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const DEFAULT_SECONDS = 10;
const QUICK_SECONDS = [5, 10, 15, 30];

function formatTime(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (safeSeconds % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export default function App() {
  const [secondsText, setSecondsText] = useState(String(DEFAULT_SECONDS));
  const [sessionSeconds, setSessionSeconds] = useState(DEFAULT_SECONDS);
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState(
    "Checking notification access...",
  );
  const [statusMessage, setStatusMessage] = useState(
    "Set a duration, then start the timer.",
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const notificationIdRef = useRef<string | null>(null);
  const deadlineRef = useRef<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const configureNotifications = async () => {
      const currentPermissions = await Notifications.getPermissionsAsync();
      let finalStatus = currentPermissions.status;

      if (currentPermissions.status !== "granted") {
        const requestedPermissions =
          await Notifications.requestPermissionsAsync();
        finalStatus = requestedPermissions.status;
      }

      if (!isMounted) {
        return;
      }

      setPermissionStatus(
        finalStatus === "granted"
          ? "Notifications enabled."
          : "Notifications are blocked. The timer still works, but no alert will appear.",
      );
    };

    void configureNotifications();

    return () => {
      isMounted = false;

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (notificationIdRef.current) {
        void Notifications.cancelScheduledNotificationAsync(
          notificationIdRef.current,
        );
        notificationIdRef.current = null;
      }
    };
  }, []);

  const clearTicker = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const clearScheduledNotification = async () => {
    if (notificationIdRef.current) {
      await Notifications.cancelScheduledNotificationAsync(
        notificationIdRef.current,
      );
      notificationIdRef.current = null;
    }
  };

  const parseSeconds = () => {
    const parsed = Number.parseInt(secondsText, 10);

    if (Number.isNaN(parsed) || parsed < 1) {
      Alert.alert(
        "Invalid duration",
        "Enter a whole number of at least 1 second.",
      );
      return null;
    }

    return parsed;
  };

  const beginTimer = async (totalSeconds: number) => {
    clearTicker();
    await clearScheduledNotification();

    const safeSeconds = Math.max(1, totalSeconds);

    setSessionSeconds(safeSeconds);
    setSecondsLeft(safeSeconds);
    setIsRunning(true);
    setStatusMessage(
      "Timer running. A local notification will appear when it reaches zero.",
    );

    deadlineRef.current = Date.now() + safeSeconds * 1000;
    notificationIdRef.current = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Timer finished",
        body: "Your countdown has reached zero.",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: safeSeconds,
        repeats: false,
      },
    });

    intervalRef.current = setInterval(() => {
      if (!deadlineRef.current) {
        return;
      }

      const remainingSeconds = Math.max(
        0,
        Math.ceil((deadlineRef.current - Date.now()) / 1000),
      );

      if (remainingSeconds === 0) {
        clearTicker();
        deadlineRef.current = null;
        setSecondsLeft(0);
        setIsRunning(false);
        setStatusMessage("Time is up.");
        return;
      }

      setSecondsLeft(remainingSeconds);
    }, 1000);
  };

  const handleStart = async () => {
    const parsedSeconds = parseSeconds();

    if (parsedSeconds === null) {
      return;
    }

    await beginTimer(parsedSeconds);
  };

  const handlePause = async () => {
    if (!isRunning) {
      return;
    }

    clearTicker();
    deadlineRef.current = null;
    setIsRunning(false);
    setStatusMessage("Timer paused. Start again to restart the countdown.");
    await clearScheduledNotification();
  };

  const handleReset = async () => {
    const parsedSeconds = parseSeconds();

    if (parsedSeconds === null) {
      return;
    }

    clearTicker();
    deadlineRef.current = null;
    setIsRunning(false);
    setSessionSeconds(parsedSeconds);
    setSecondsLeft(parsedSeconds);
    setSecondsText(String(parsedSeconds));
    setStatusMessage("Timer reset and ready to start again.");
    await clearScheduledNotification();
  };

  const quickSetSeconds = async (secs: number) => {
    setSecondsText(String(secs));

    if (isRunning) {
      return;
    }

    const totalSeconds = Math.max(1, Math.floor(secs));
    setSessionSeconds(totalSeconds);
    setSecondsLeft(totalSeconds);
    setStatusMessage(`Ready for a ${totalSeconds}-second timer.`);
    await clearScheduledNotification();
  };

  const progress = sessionSeconds > 0 ? 1 - secondsLeft / sessionSeconds : 0;

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.backgroundGlowTop} />
        <View style={styles.backgroundGlowBottom} />
        <StatusBar style="light" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardShell}
        >
          <View style={styles.shell}>
            <Text style={styles.kicker}>Timer + Notification</Text>
            <Text style={styles.title}>A simple Expo countdown app</Text>
            <Text style={styles.subtitle}>
              Start a timer, pause it, or reset it. A local notification will
              fire when the countdown ends.
            </Text>

            <View style={styles.card}>
              <Text style={styles.cardLabel}>Time remaining</Text>
              <Text style={styles.timer}>{formatTime(secondsLeft)}</Text>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${Math.max(0, Math.min(1, progress)) * 100}%` },
                  ]}
                />
              </View>
              <Text style={styles.cardNote}>
                {isRunning ? "Running now" : "Stopped"}
              </Text>
            </View>

            <View style={styles.controls}>
              <Text style={styles.sectionLabel}>Duration (seconds)</Text>
              <View style={styles.inputRow}>
                <TextInput
                  value={secondsText}
                  onChangeText={setSecondsText}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  blurOnSubmit={true}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  placeholder="10"
                  placeholderTextColor="#7f8a9a"
                  style={styles.input}
                />
                <Text style={styles.inputSuffix}>s</Text>
              </View>

              <View style={styles.quickRow}>
                {QUICK_SECONDS.map((secs) => (
                  <Pressable
                    key={secs}
                    onPress={() => {
                      void quickSetSeconds(secs);
                    }}
                    style={({ pressed }) => [
                      styles.quickButton,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.quickButtonText}>{secs} s</Text>
                  </Pressable>
                ))}
              </View>

              <View style={styles.buttonRow}>
                <Pressable
                  onPress={() => {
                    void handleStart();
                  }}
                  style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.primaryButtonText}>Start</Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    void handlePause();
                  }}
                  style={({ pressed }) => [
                    styles.secondaryButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.secondaryButtonText}>Pause</Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    void handleReset();
                  }}
                  style={({ pressed }) => [
                    styles.secondaryButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.secondaryButtonText}>Reset</Text>
                </Pressable>
              </View>

              <View style={styles.messageBox}>
                <Text style={styles.messageTitle}>Status</Text>
                <Text style={styles.messageBody}>{statusMessage}</Text>
                <Text style={styles.permissionText}>{permissionStatus}</Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#081120",
  },
  keyboardShell: {
    flex: 1,
  },
  shell: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 16,
  },
  backgroundGlowTop: {
    position: "absolute",
    top: -120,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(99, 102, 241, 0.28)",
  },
  backgroundGlowBottom: {
    position: "absolute",
    bottom: -100,
    left: -90,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(245, 158, 11, 0.16)",
  },
  kicker: {
    color: "#9cc3ff",
    textTransform: "uppercase",
    letterSpacing: 1.8,
    fontSize: 12,
    fontWeight: "700",
  },
  title: {
    color: "#f8fafc",
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "800",
    maxWidth: 320,
  },
  subtitle: {
    color: "#c4cfde",
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 340,
  },
  card: {
    backgroundColor: "rgba(15, 23, 42, 0.88)",
    borderColor: "rgba(148, 163, 184, 0.18)",
    borderWidth: 1,
    borderRadius: 28,
    paddingVertical: 26,
    paddingHorizontal: 20,
    gap: 12,
  },
  cardLabel: {
    color: "#9fb1c7",
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  timer: {
    color: "#ffffff",
    fontSize: 60,
    lineHeight: 68,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#f59e0b",
  },
  cardNote: {
    color: "#92a3b9",
    fontSize: 14,
  },
  controls: {
    backgroundColor: "rgba(8, 17, 32, 0.68)",
    borderRadius: 28,
    borderColor: "rgba(148, 163, 184, 0.15)",
    borderWidth: 1,
    padding: 18,
    gap: 14,
  },
  sectionLabel: {
    color: "#d5def0",
    fontSize: 14,
    fontWeight: "700",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#132238",
    color: "#f8fafc",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.18)",
  },
  inputSuffix: {
    color: "#9fb1c7",
    fontSize: 14,
    fontWeight: "700",
    minWidth: 36,
    textAlign: "right",
  },
  quickRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  quickButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "rgba(148, 163, 184, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.18)",
  },
  quickButtonText: {
    color: "#e2e8f0",
    fontSize: 13,
    fontWeight: "700",
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#f59e0b",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    minWidth: 96,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "800",
  },
  secondaryButton: {
    backgroundColor: "rgba(37, 99, 235, 0.2)",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    minWidth: 96,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(96, 165, 250, 0.25)",
  },
  secondaryButtonText: {
    color: "#eff6ff",
    fontSize: 15,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
  messageBox: {
    marginTop: 4,
    padding: 14,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.12)",
    gap: 4,
  },
  messageTitle: {
    color: "#f8fafc",
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  messageBody: {
    color: "#d1d9e7",
    fontSize: 14,
    lineHeight: 20,
  },
  permissionText: {
    color: "#9fb1c7",
    fontSize: 12,
    lineHeight: 18,
  },
});
