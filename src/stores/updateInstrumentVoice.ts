import { instruments } from "./instruments";

export function updateInstrumentParam(
  instanceId: string,
  moduleId: string,
  param: string,
  value: number
) 

// FINISH THIS FOR UI REACTIVITY 
{
  instruments.update(map => {
    const inst = map[instanceId];
    if (!inst) return map;

    return {
      ...map,
      [instanceId]: {
        ...inst,
        voices: [

        ]
      }
    };
  });
}