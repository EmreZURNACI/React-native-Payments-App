import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/Redux/store'
import RootNavigation from './src/Navigations/RootNavigation'
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={[styles.container]}>
        <RootNavigation />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
