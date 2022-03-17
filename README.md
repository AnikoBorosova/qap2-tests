## API-tests with ChaiJS

API tested: https://qap2-z5olkhbk.review-apps.contractbook.com

### Versions, requirements
- Tested on Ubuntu 20.04.4 LTS
- Node v14.17.0
- Chai v4.3.4
- chai.http v4.3.0
- mocha v9.2.2

### How to run the tests locally
- git clone this repo
- run `npm install`
- save your own api-key into a secret.json into the root folder

Format:
```
{
	"apiKey": ```your-api-key```
}
```

- run `npm test` or use the other scripts listed in the ```package.json``` file