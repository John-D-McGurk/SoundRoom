import { instruments } from "./instruments";

export function updateInstrumentParam(
  instanceId: string,
  moduleId: string,
  param: string,
  value: number
) {
  instruments.update(map => {
    const inst = map[instanceId];
    if (!inst) return map;

    return {
      ...map,
      [instanceId]: {
        ...inst,
        params: {
          ...inst.params,
          [moduleId]: {
            ...inst.params[moduleId],
            [param]: value
          }
        }
      }
    };
  });
}