$(document).ready(function() {
  // LIBRARIES CODE
  LibVars = {};
  // PROJECT CODE
  var _that = this;
  // Block#: GcDvP0{-CK.*aO?.JPGQ
  function on_Button_click(e) {
    try {
      // Block#: nwY;yPo1)K:hjxgz#o{[
      $('[obj-name="DrawViewContainer"]').show(); // Block#: cS9hy=GJ21Bdn^=dYX@h
      $('[obj-name="Shape"]').show(); // Block#: F(!YAz:DxLwo%;mDE*Lm
      $('[obj-name="Charts"]').show(); // Block#: AJ_nL#mfwc^NtJF[J_Mu
      com.fc.JavaScriptDistLib.GraphContainer.createChartWithList('Charts', ['Jun', 'Jul', 'Aug'], [20, 80, 120], 'Test') // Block#: n|Sx$R620KPx?jzIijz=
      com.fc.JavaScriptDistLib.GraphContainer.addChartTransition('Charts', 500, 500); // Block#: I12{};!/,?[ZYM}v{PPb
      com.fc.JavaScriptDistLib.Label.setProperty["Text"]("Label2", (com.fc.JavaScriptDistLib.TextLib.convertToText(com.fc.JavaScriptDistLib.Label.getProperty["Background color"]("Label")))); // Block#: Y0x?uO*sbiTC4mQ}zQM0
      com.fc.JavaScriptDistLib.Textbox.setProperty["Text"]("Textbox", (com.fc.JavaScriptDistLib.TextLib.convertToText(com.fc.JavaScriptDistLib.Textbox.getProperty["Background color"]("Textbox"))));
      e.stopPropagation();
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  };
  $('[obj-name="Button"]').on('click', on_Button_click);
  $('[obj-name="MainScreen"]').show().triggerHandler('show');
  history.pushState({
    'view': 'MainScreen'
  }, 'MainScreen', '?MainScreen');
});
// Generated by snapp
// 684018-706013-928596-825449
