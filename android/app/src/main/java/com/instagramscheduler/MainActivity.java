package com.instagramscheduler;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

// Custom imports:
import com.rnfs.RNFSPackage;
import io.neson.react.notification.NotificationPackage;
import com.instagramscheduler.publish.*;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.imagepicker.ImagePickerPackage;
import com.yoloci.fileupload.FileUploadPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "InstagramScheduler";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNFSPackage(),
            new InstagramPublishPackage(this),
            new NotificationPackage(this),
            new RNDeviceInfo(),
            new ImagePickerPackage(),
            new FileUploadPackage()
        );
    }
}
