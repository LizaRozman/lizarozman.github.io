---
layout: post
title: Overlapping features of neurological diseases
cover-img: /assets/img/brain_wallpaper_dark.jpg
---

<html lang="en">
<head>
  <title>Neurological Disorders</title>
  <!-- Initialize a global WBK function -->
  <script src="https://cdn.rawgit.com/maxlath/wikidata-sdk/dist/dist/wikibase-sdk.min.js"></script>
  <!-- Initialize a global wdk object using the WBK object -->
  <script src="https://cdn.rawgit.com/maxlath/wikidata-sdk/dist/dist/wikidata-sdk.min.js"></script>
  <script src="http://d3js.org/d3.v4.min.js"></script>
  <script src="https://cdn.anychart.com/releases/8.9.0/js/anychart-core.min.js"></script>
  <script src="https://cdn.anychart.com/releases/8.9.0/js/anychart-venn.min.js"></script>
  <script src="https://cdn.anychart.com/releases/8.9.0/themes/pastel.min.js"></script>
  <script src="/assets/js/queries.js"></script>
  <script src="/assets/js/Function_VennData.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital@0;1&display=swap" rel="stylesheet">

    <style type="text/css">
      html,
      body,
      #container
      {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
</head>

  <h1> Neurological Disorders </h1>
  <p style="text-align:justify;"> Neurological disorders are very complex and often present differently in different people. You can use the tool below to compare any two (out of the available) neurological disorders and see how they compare in different features (symptoms, drugs used to treat the disease, genes associated with the disorder and brain regions in which these genes are expressed. We hope this tool will provide insight into how different disorders compare to each other and will help neuroscientists better understand the relationship between elements involved in these disorders. </p>

<body style="background-color:lightgray;">
  <h1 style="font-family:verdana;  text-align:center;"> Pick your poison! </h1> 
  <pre id="output"></pre>
  <p> Choose 2 diseases and the feature you want to compare between them. </p>

<!-- Hard coded drop-down menu -->
  <div id="information">
    <form id="Disease1">
      <select id="disease1" name="Disease 1">
        <option value="Q181923"> ADHD </option>
        <option value="Q4340209"> Mental Depression</option>
        <option value="Q131755"> Bipolar Disorder</option>
        <option value="Q202387"> PTSD</option>
      </select>
      <select id="disease2" name="Disease 2">
        <option value="Q181923"> ADHD </option>
        <option value="Q4340209"> Mental Depression</option>
        <option value="Q131755"> Bipolar Disorder</option>
        <option value="Q202387"> PTSD</option>
       </select>
      <select id="comparison" name="Comparison">
          <option value="symp"> Symptoms</option>
          <option value="treat"> Treatments </option>
          <option value="gene"> Genes</option>
          <option value="struct"> Brain structures</option>
      </select>
    </form>
    <button id="searchButton" type="button" name="button">Search</button>
  </div>
<div id="container"></div>
<!-- Return Query Script -->
  <script>
      document.getElementById('searchButton').onclick = function () {
          d3.select("svg").remove();
          var dis1 = document.getElementById("disease1").value
          var dis2 = document.getElementById("disease2").value
          var comp = document.getElementById("comparison").value

          vennDiagram(dis1, dis2, comp);
      }
  </script>
</body>
</html>
