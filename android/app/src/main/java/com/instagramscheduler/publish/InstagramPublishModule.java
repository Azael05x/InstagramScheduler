package com.instagramscheduler.publish;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import java.io.File;
import android.os.Environment;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.ReactActivity;

import java.util.Map;
import java.util.HashMap;

public class InstagramPublishModule extends ReactContextBaseJavaModule {

  private static final String TYPE = "image/jpeg";

  private final ReactApplicationContext context;
  private final Activity activity;

  public InstagramPublishModule(ReactApplicationContext reactContext, Activity mainActivity) {
    super(reactContext);
    this.context = reactContext;
    this.activity = mainActivity;
  }

  @Override
  public String getName() {
   return "InstagramPublish";
  }

  @ReactMethod
  public void share(String mediaPath) {
    Intent intent = activity.getPackageManager().getLaunchIntentForPackage("com.instagram.android");
    if (intent != null) {
      // Create the new Intent using the 'Send' action.
      Intent share = new Intent(Intent.ACTION_SEND);

      // Set the MIME type
      share.setType(TYPE);
      share.setPackage("com.instagram.android");

      // Create the URI from the media
      File media = new File(mediaPath);
      Uri uri = Uri.fromFile(media);

      // Add the URI to the Intent.
      share.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
      share.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
      share.putExtra(Intent.EXTRA_STREAM, uri);

      // Broadcast the Intent.
      activity.startActivity(share);
      // activity.startActivity(Intent.createChooser(share, uri.toString()));
    } else {
        // bring user to the market to download the app.
        // or let them choose an app?
        intent = new Intent(Intent.ACTION_VIEW);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setData(Uri.parse("market://details?id=com.instagram.android"));
        activity.startActivity(intent);
    }
  }
}
