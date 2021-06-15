# UtmBuilder
It is a URL Campaign Builder Tools. <br>
This tool allows you to easily add campaign parameters to URLs so you can track Custom Campaigns in Google Analytics.<br>
It is use for Generate custom campaign parameters for your advertising URLs.<br>
This is core Javascript tools which is more light weight then any others,<br>

# Installation
add this javascript file into your project or page header<br>
It does not required any dependency
<pre>
  <script type="text/javascript" src="utmBuilder.js"></script>
</pre>

<p>Next create a div and create a textarea and gives a id both of them</p>
<pre>
    &lt;div id = "utmBuilder"&gt;&lt;/div&gt;
    <textarea id = "textarea"></textarea>
</pre>
<p>Next initilize the library into project </p>
<pre>
      <script>
            UTMBUILDER.init("#utmBuilder", "textarea"); //initialize
            UTMBUILDER.formBuild(); //build the utm builder form view
            UTMBUILDER.createUrl(); //using for create your campaign url
      
      </script>
</pre>

# Thank You
