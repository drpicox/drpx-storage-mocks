drpx-storage-mocks
=================

A mocks for drpx-storage wrapper for mozilla localforage.




Install
-------

With bower: 

```bash
$ bower install --save drpx-storage-mocks
```

add to your test environment: (ex: karma.conf.js)

```javascript
    mdule.exports = function(config) {
        config.set({
            files: [
                'bower_components/drpx-storage-mocks/drpx-storage-mocks.js',
                ...
            ],
            ...
        })
    }
    angular.module('yourModule', ['drpxStorage']);
```


Example of use
--------------

```javascript
describe('ProductsStorage', function() {

    beforeEach(module('app.products.services', 'drpxStorageMocks'));

    it('should load a stored value', inject(function(ProductsStorage, storageFactory, $rootScope) {

        storageFactory._values['a'] = {id: 'a', v: 'va'};

        var loaded;
        ProductsStorage.load('a').then(function(result) {
            loaded = result;
        });
        $rootScope.$digest();

        expect(loaded.id).toBe('a');
        expect(loaded.v).toBe('va');

    }));



    it('should load multiple values', inject(function(ProductsStorage, storageFactory, $rootScope) {

        storageFactory._values['a'] = {id: 'a', v: 'va'};
        storageFactory._values['b'] = {id: 'b', v: 'vb'};

        var loadeds;
        ProductsStorage.list().then(function(result) {
            loadeds = result;
        });
        $rootScope.$digest();

        expect(loadeds.length).toBe(2);
        expect(loadeds[0]).toBeDefined();
        expect(['a','b']).toContain(loadeds[0].id);
        if (loadeds[0].id === 'a') {
            expect(loadeds[0].v).toBe('va');
            expect(loadeds[1].id).toBe('b');
            expect(loadeds[1].v).toBe('vb');
        } else {
            expect(loadeds[0].id).toBe('a');
            expect(loadeds[0].v).toBe('va');
            expect(loadeds[1].id).toBe('b');
            expect(loadeds[1].v).toBe('vb');
        }

    }));

    it('should store a value', inject(function(ProductsStorage, storageFactory, $rootScope) {

        var rawProduct = {id: 'a', v: 'va'};

        var saved;
        ProductsStorage.save(rawProduct).then(function(result) {
            saved = result;
        });
        $rootScope.$digest();

        expect(saved).toBe(rawProduct);
        expect(storageFactory._values['a']).toBeDefined();
        expect(storageFactory._values['a'].id).toBe('a');
        expect(storageFactory._values['a'].v).toBe('va');

    }));

});
```
