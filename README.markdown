# May Is Bike Month

Automatically generate leaderboard for May Is Bike Month

**[mayisbikemonth.github.io](https://mayisbikemonth.github.io/)**

---
## Development

This is a Python project, view the current version of Python in [.tool-versions](.tool-versions) (this is the [asdf](https://asdf-vm.com/) version management file).

Package management is via Poetry. To install dependencies, run `poetry install`.

### The webpage (hosted via github pages)

The webpage is built with [Nikola](https://getnikola.com/). To start the site locally (for development) run:

```bash
poetry run nikola serve
```

... and then visit [http://localhost:8000](http://localhost:8000).

To build the site (for publishing on github pages), run `poetry run nikola build`.
