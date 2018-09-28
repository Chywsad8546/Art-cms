
function matches (pattern, key) {
    if (Array.isArray(pattern)) {
        return pattern.indexOf(key) > -1;
    } else if (typeof pattern === 'string') {
        return pattern.split(',').indexOf(key) > -1;
    }
    return false;
}

export default {
    name: 'navigation',
    abstract: true,
    props: {
        include: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    data: () => ({
    }),
    computed: {},
    watch: {
        include (val) {
            for (const key in this.cache) {
                const cachedNode = this.cache[key]
                if (cachedNode) {
                    if (!matches(val, key)) {
                        cachedNode.componentInstance.$destroy()
                        delete this.cache[key];
                    }
                }
            }
        }
    },
    created () {
        this.cache = {};
    },
    destroyed () {
        for (const key in this.cache) {
            const vnode = this.cache[key];
            vnode && vnode.componentInstance.$destroy();
        }
    },
    render () {
        const vnode = this.$slots.default ? this.$slots.default[0] : null;
        if (vnode) {
            // console.log('navigation', vnode.key);
            if (this.include && this.include.length > 0 && (!vnode.key || !matches(this.include, vnode.key))) {
                // console.log('navigation','不缓存')
                return vnode;
            }
            // vnode.key = vnode.key || (vnode.isComment
            //     ? 'comment'
            //     : vnode.tag);
            // // prevent vue-router reuse component
            // const key = getKey(this.$route, keyName);
            // if (vnode.key.indexOf(key) === -1) {
            //     vnode.key = `__navigation-${key}-${vnode.key}`;
            // }
            // if (this.cache[key]) {
            //     if (vnode.key === this.cache[key].key) {
            //         // restore vnode from cache
            //         vnode.componentInstance = this.cache[key].componentInstance;
            //     } else {
            //         // replace vnode to cache
            //         this.cache[key].componentInstance.$destroy();
            //         this.cache[key] = vnode;
            //     }
            // } else {
            //     // cache new vnode
            //     this.cache[key] = vnode;
            // }
            const key = vnode.key;

            if (this.cache[key]) {
                // console.log('navigation','取缓存')
                vnode.componentInstance = this.cache[key].componentInstance;
                // make current key freshest
                // remove(keys, key)
                // keys.push(key)
            } else {
                // console.log('navigation','重新缓存')
                this.cache[key] = vnode;
                // keys.push(key)
                // prune oldest entry
                // if (this.max && keys.length > parseInt(this.max)) {
                //     pruneCacheEntry(cache, keys[0], keys, this._vnode)
                // }
            }
            vnode.data.keepAlive = true;
        }
        return vnode;
    }

};
