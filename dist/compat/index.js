'use client';

// src/compat/withLegacyProps.tsx
import { jsx } from "react/jsx-runtime";
var withLegacyProps = (Component, map) => {
  const Wrapped = (props) => {
    const source = props;
    const next = {};
    for (const [key, value] of Object.entries(source)) {
      const target = map[key];
      if (target === void 0) {
        next[key] = value;
      } else if (!(target in source)) {
        next[target] = value;
      }
    }
    return /* @__PURE__ */ jsx(Component, { ...next });
  };
  Wrapped.displayName = `withLegacyProps(${Component.displayName ?? Component.name ?? "Component"})`;
  return Wrapped;
};
export {
  withLegacyProps
};
//# sourceMappingURL=index.js.map