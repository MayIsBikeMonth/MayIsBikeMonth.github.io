# May Is Bike Month

Automatically generate leaderboard for May Is Bike Month

**[mayisbikemonth.github.io](https://mayisbikemonth.github.io/)**

---
## Development

This is a Python project, view the current version of Python in [.tool-versions](.tool-versions) (the [asdf](https://asdf-vm.com/) version management file).

Package management is via Poetry. To install dependencies, run `poetry install`.

### The webpage (hosted via github pages)

The webpage is a static site.

For development, use [Nikola](https://getnikola.com/) - the site is just static files but Nikola provides a server for local development and adds livereload.

To start the site locally run:

```bash
poetry run nikola auto -b
```

(this will automatically open the site in your browser).

(this will automatically generate some extra files too - reset the repo with `git clean -f -d` to remove them)
