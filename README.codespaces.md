# Hasura Project Setup - GitHub CodeSpaces

👉 [For the main README click here](README.md)

When the workspace builds up, just open the port `9695` to run the HasuraCLI Console.




---

I write here what I do, ok?

By now, project is set to "hasura-state", so it takes all the files from there

I'm going to dubplicate it and create an empty one
then with the console I try to create some migations and export it
let's see

ok, that is an empty project


Makefile.env works like an environment file
i just pushed new documentation
it's quite cool... I'm learning a lot about Makefile and will write an article about it :-)


anyway...


the start script starts without anything now
I've commented the import of the state

so now I'm going to exports the meta and I should get a clean state in "foobar"
it this works, foobar will be updated, else "hasura-state" will.. and that would be a fuckup

the esieast way to see this is to commit, export, and see what changes in git.
