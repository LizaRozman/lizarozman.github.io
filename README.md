**Welcome to our repository containing the project we worked on during the practical 'Programming in the Life Sciences' at Maastricht University!**

The aim of this project was to explore and visualize how similar mental disorders are to each other. While it is necssary to divide mental disorders into different categories and sub-categories for diagnostic reasons, this approach presents mental disorders in a binary way, and fails to show the inherently continous nature of these disorders. In reality, a person can show a range of symptoms that can be associated with multiple disroders, while the disorders themselves can arise from multiple underlying biological mechanisms, which also can overlap between disorders. We believe that studying such disorders in an integrated way without the necessity of focusing on one disroder or another may help us better identify the connections between symptoms and biological mechanisms.

To aid such research initiatives, we have created a website that eplores and visualizes potential overlaps between the symptoms, treatmetns, genetic associations and brain regions involved in different mental disorders. At the moment, were entirely relying on the quite limited data acquired from Wikidata to do so, however our code may be modified to use other sources as well. This would making the comparison more accurate, and also aaplicable to a larger range of mental disorders.

# How to use:
1. Navigate to Welcome page of our project by clicking the link in the 'About' section on Github, or type "lizarozman.github.io" into your browser.
2. Once on the webpage, you can navigate between the 'Main', 'Overlap' and 'About us' pages via the navigation bar on top.

## The Main page contains a post about brain anatomy.
1. Click 'Read more' to see two interactive images of the brain (one lateral, and one lateral sliced view).
2. By hovering your mouse over different parts of the brain, a tooltip will show you the name of the region you are hovering over.
3. Click on a region you are interested in to go to the corresponding Wikipedia page with more information about the region.

## The Overlap page contains the main part of our project.
 1. Scroll down on this page to see 3 drop-down menus and a 'Searrch' button.
 2. Select the two different(!) mental disorders that you want to compare via the first two drop-down menus.
 3. Then, select which characteristic of the diseases you want to compare via the third drop-down menu.   
 4. Click 'Search' to see a Venn-diagram showing the characteristics of interest for both dsiorders, as well as the overlap between them (if there is any).
 5. Hover over the diagram to see which circle belongs to which disorder. Clicking a circle or the intersection will show you the items (as text) belonging to the respective field.

## Our files.
Because this template was forked from another user, there are a couple files which are not our own that we are keeping in the repository as they encode for the layout of the template. The following files are the main ones that we either wrote or adapted for our website:
 1. main.html: the main code of our script is written
 2. index.html: the layout of our first page (came with the template)
 3. aboutus.md: code for the "About us" page
 4. config.yml: for settings that affect your entire website (came witht he tamplate)
 5. AUTHORS.md: contain information about the authors of the page
 6. assets --> js --> Function_VennData.js: contains the function for the Venn diagrams
 7. assets --> js --> queries.js: contains functions that assemble Wikidata queries
 8. assets --> img: contains all of the images used for the website
 9. posts --> 2021-11-19-brain-anatomy.html: contains the code for the blog post about brain anatomy and function

## Other comments.
We would like to point out that there was no data on brain structures in Wikidata database, therefore the output for a combination of diseases with Mental Depression will only give the output of the other one. We area lso aware that two of the output treatments for Mental Depression are "Jeff Bezos" and "Pee Pee Island" because they are also in Wikidata database.

