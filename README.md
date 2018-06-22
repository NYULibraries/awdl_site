Ancient World Digital Library site
========

```bash
$ https://github.com/dismorfo/aco-site.git
```
To run agartha for development site, use at command line: 

rm build/js/*;  agartha forge

Then to created compressed CSS file, 

compass compile -s compressed  --force

To pass in the enviromental variable for production, use

AGARTHA_ENVIRONMENT=production agartha forge