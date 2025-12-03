// bool pointActive(int point){
//   return localstorage.point;
// }
//
// void unlockPoint(int point){
//   localstorage.setItem(point, true);
// }
//
// void drawPoint(int point){
//   if(pointActive(point)){
//     // draw the unlocked version
//   }
//   else{
//     // draw normal locked one 
//   }
// }

// rewrite lines 378-380 as

void pointUnlock(int point, str subsiteLink){
  if(window.location.pathname.includes(subsiteLink) && !isPointActive(point)){
    unlockPoint(point);
  }
}
