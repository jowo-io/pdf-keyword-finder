# pdf-keyword-finder

Find keywords in PDF files and save the matches to a CSV.

# install

This script requires NodeJS to run. You can download it here: [https://nodejs.org/en/download](https://nodejs.org/en/download)

Once you have NodeJS installed, open a terminal window, `cd` into this script's directory and run:

```
npm run install
```

> guide on `cd` ("change directory") can be found [here](http://modulesunraveled.com/command-line-beginners/moving-and-out-directories-cd-command)

# bin folder

The `bin/` folder in this directory is used to store all of your assets. Place your assets (CSVs, PDFs, etc) into the bin folder and then refer to their file/directory paths in the script's arguments

# script

Now you're read to run the script. The script has various arguments that can be passed into it. Most are required, but some are optional.

### Variables

Run the help command to see a description of all of the supported arguments:

```
npm run search -- --help
```

### example

```
npm run search -- --csvFile=HELLO_WORLD/data.csv --pdfDir="HELLO_WORLD/pdfs/" --pdfColumn="PDF"  --keyword="hello" --keyword="world" --outputFile="output.csv"
```

For the above script, the following folder structure would be required:

```
bin/
    HELLO_WORLD/
        data.csv
        pdfs/
            1.pdf
            2.pdf
            3.pdf

```

And the `data.csv` file above would contain the following:

```
DATE,TITLE,URL,PDF
06/11/2020,Good Morning World,http://www.hello.com/1.pdf,1.pdf
08/12/2020,Good Day World,http://www.hello.com/2.pdf,2.pdf
06/12/2020,Good Evening World,http://www.hello.com/3.pdf,3.pdf
```

### output folder

In the `bin/output/` folder your output CSV search results will be saved under the name provided in the `outputFile` argument.

The `output.csv` output file would look like this for the above arguments:

```
DATE,TITLE,URL,PDF,Keyword,Page,Caption
06/11/2020,Good Morning World,http://www.hello.com/1.pdf,1.pdf,hello,2,The good fellow said hello world.
06/11/2020,Good Morning World,http://www.hello.com/1.pdf,1.pdf,world,2,The good fellow said hello world.
06/12/2020,Good Evening World,http://www.hello.com/3.pdf,3.pdf,world,4,The good fellow said bye bye world.
06/12/2020,Good Evening World,http://www.hello.com/3.pdf,3.pdf,world,7,The bad fellow said adios world.
```

What does the above file mean?
It means 4 search results were found in total.
One result was found for `hello` on page 2 of the `1.pdf` file.
One result was found for `world` on page 2 of the `1.pdf` file.
One result was found for `world` on page 4 of the `3.pdf` file.
One result was found for `world` on page 7 of the `3.pdf` file.
No search results were found in `2.pdf`, which is why it's not present in the results.
The last bit of text, with the column titles of `Caption` is a copy of the whole page's text that the keyword was found in.
