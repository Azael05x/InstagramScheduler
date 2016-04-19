package com.instagramscheduler;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.ViewManager;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.JavaScriptModule;

import android.content.Intent;
import java.io.File;
import android.net.Uri;
import android.app.Activity;
import android.content.Context;

import java.util.Map;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class InstagramShareAndroidModule extends ReactContextBaseJavaModule {

  ReactContext rx;

  @ReactMethod
  public void share(String url) {
    if (url != null && !url.equals("")) {
      String fileName = generateFileNameFromUrl(url);
      String imageLocalPath = Environment.getExternalStorageDirectory()+ File.separator+"socialphotos"+ fileName;
      if (!new File(imageLocalPath).exists()) {
        ImageDownloadModel imageDownloadModel = new ImageDownloadModel();
        imageDownloadModel.setImageLocalPath(imageLocalPath);
        imageDownloadModel.setImageUrl(url);
        imageDownloadModels.add(imageDownloadModel);
      }
      ImageLoadAsynkTask imageLoadAsynkTask = new ImageLoadAsynkTask(new ImageDownloadDelegate(), imageDownloadModel, albumDir, activity);
      imageLoadAsynkTask.execute();

      // Create the new Intent using the 'Send' action.
      Intent share = new Intent(Intent.ACTION_SEND);

      // Set the MIME type
      share.setType("image/*");

      // Create the URI from the media
      File media = new File(Environment.getExternalStorageDirectory() + imageLocalPath);
      Uri uri = Uri.fromFile(media);

      // Add the URI to the Intent.
      share.putExtra(Intent.EXTRA_STREAM, uri);

      // Broadcast the Intent.
      this.rx.startActivity(Intent.createChooser(share, "Share to"));
    }
  }

  public InstagramShareAndroidModule(ReactApplicationContext reactContext) {
    super(reactContext);
    rx = reactContext;
  }

  @Override
  public String getName() {
    return "InstagramShareAndroid";
  }
}


//String mediaPath = Environment.getExternalStorageDirectory() + filename;

class InstagramShareAndroidModuleReactPackage implements ReactPackage {
  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();

    modules.add(new InstagramShareAndroidModule(reactContext));

    return modules;
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

  @Override
  public List<Class<? extends JavaScriptModule>> createJSModules() {
    return Collections.emptyList();
  }
}
