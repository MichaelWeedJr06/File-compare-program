const { scrapeLinks } = require("./scrapers/scrapLinks.js");
const { getHash } = require("./scrapers/ScrapAndHashPage.js");
const { QLineEdit, QWidget, QPushButton , QMainWindow, FlexLayout} = require("@nodegui/nodegui");
const readFiles = async (filename) => {
const hostURL = "https://raw.githubusercontent.com";

  try {
    const data = filename;
    const githubLinks = data;
    let hashes = [];

    for (let i = 0; i < githubLinks.length; i++) {
      let temp = [];
      let site_links = await scrapeLinks(githubLinks[i]);
      console.log(site_links);
      for (const link of site_links) {
        let rightLink = link.replace("/blob", "/refs/heads");
        const subHash = await getHash(`${hostURL}${rightLink}`);
        temp.push(subHash);
      }
      hashes.push(temp);
    }
    same_count = [];
    for (let i = 0; i < hashes.length; i++) {
  for (let j = i + 1; j < hashes.length; j++) {
    let same = 0;
    const set = new Set(hashes[i]);

    for (const hash of hashes[j]) {
      if (set.has(hash)) same++;
    }
    same_count.push(same);
    console.log(`Repo ${i} vs Repo ${j}: ${same} matches`);
  }
}
  } catch (err) {
    console.error(`Error reading in file: ${err}`);
  }
};
function loadUI(){
  const win = new QMainWindow();
  win.setWindowTitle("File Compare Program")

  const centralWidget = new QWidget();
  const layout = new FlexLayout();

  centralWidget.setLayout(layout)
  win.setCentralWidget(centralWidget);

  const input1 = new QLineEdit();
  input1.setPlaceholderText("Enter Link to Repo 1");

  const input2 = new QLineEdit();
  input2.setPlaceholderText("Enter Link to Repo 2");

  const compareButton = new QPushButton();
  compareButton.setText("Submit");

  compareButton.addEventListener("clicked", () => {
    let repos = [];
     repos[0] = input1.text();
     repos[1] = input2.text();
    console.log(`User inputs: ${repos[0]}, ${repos[1]}`);
    readFiles(repos);
  })

  layout.addWidget(input1);
  layout.addWidget(input2);
  layout.addWidget(compareButton);

  win.show();
  global.win = win;
}
loadUI();
