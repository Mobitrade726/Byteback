import SpInAppUpdates, {
  IAUUpdateKind,
  IAUInstallStatus,
} from 'sp-react-native-in-app-updates';

const inAppUpdates = new SpInAppUpdates(false);

export const checkFlexibleUpdate = async () => {
  try {
    // 🔍 Check update from Play Store
    const result = await inAppUpdates.checkNeedsUpdate();

    console.log('Update Result:', result);

    if (result.shouldUpdate) {

      // 🚀 Start Flexible Update
      inAppUpdates.startUpdate({
        updateType: IAUUpdateKind.FLEXIBLE,
      });

      // 👂 Listen download status
      inAppUpdates.addStatusUpdateListener(downloadStatus => {

        console.log('Download Status:', downloadStatus);

        if (downloadStatus.installStatus === IAUInstallStatus.DOWNLOADED) {
          console.log('✅ Update Downloaded - Will install on restart');
        }
      });
    }
  } catch (error) {
    console.log('Flexible Update Error:', error);
  }
};
