const elementMap = new Map();

export default {
    set(element, key, instance) {
        if (!elementMap.has(element)) {
            elementMap.set(element, new Map());
        }

        const instanceMap = elementMap.get(element);

        // make it clear we only want one instance per element
        // can be removed later when multiple key/instances are fine to be used
        if (!instanceMap.has(key) && instanceMap.size !== 0) {
            console.error(`More than one instance per element is not allowed. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
            return;
        }

        instanceMap.set(key, instance);
    },

    get(element, key) {
        if (elementMap.has(element)) {
            return elementMap.get(element).get(key) || null;
        }

        return null;
    },

    remove(element, key) {
        if (!elementMap.has(element)) {
            return;
        }

        const instanceMap = elementMap.get(element);

        instanceMap.delete(key);

        // free up element references if there are no instances left for an element
        if (instanceMap.size === 0) {
            elementMap.delete(element);
        }
    },
};
