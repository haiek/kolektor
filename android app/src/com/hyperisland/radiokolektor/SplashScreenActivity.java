package com.hyperisland.radiokolektor;

import java.util.Timer;
import java.util.TimerTask;
import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;

public class SplashScreenActivity extends Activity {

  private long splashDelay = 2000; //2 segundos

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.splash_screen_activity);

    TimerTask task = new TimerTask() {
      @Override
      public void run() {
        Intent mainIntent = new Intent().setClass(SplashScreenActivity.this, MainActivity.class);
        startActivity(mainIntent);
        finish();//The splash acvity is distroyed, so the user can't go back.
      }
    };

    Timer timer = new Timer();
    timer.schedule(task, splashDelay);//After 2 sec, task is called
  }

}
