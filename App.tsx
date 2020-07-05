import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  BackHandler,
  Platform,
} from "react-native";
import WebView from "react-native-webview";

const App = () => {

  const [canGoBack, setCanGoBack] = useState(false);

  const webviewRef = useRef(null);

  backButtonHandler = () => {
    if (canGoBack) webviewRef.current.goBack();
    else BackHandler.exitApp();
  };

  useEffect(() => {
    const backAction = () => {
      backButtonHandler();
      return true;
    };

    // This feature will work only in Android
    if (Platform.OS === 'android' ) {
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );

        return () => backHandler.remove();
    }

  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.flexContainer}>
        <WebView
          source={{ uri: "http://jotiksha.com/" }}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator
              color="black"
              size="large"
              style={styles.flexContainer}
            />
          )}
          ref={webviewRef}
          onNavigationStateChange={(navState) => {
            setCanGoBack(navState.canGoBack);
          }}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});

export default App;
