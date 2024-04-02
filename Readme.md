# venn-nodejs

**UPD**: doesn't really work, because needs `getComputedTextLength` for layout. Probably need to use headless-browser, like in [mermaid-isomorphic](https://github.com/remcohaszing/mermaid-isomorphic).

Renders diagram on the server side with [Venn.js](https://github.com/upsetjs/venn.js/), getting image file as output.

Can be used like this:

```
npx @stereobooster/venn-nodejs -s g1.json -d g1.svg
```

## TODO

- [ ] github actions to run tests
