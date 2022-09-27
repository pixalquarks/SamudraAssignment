import jsonpatch from "jsonpatch";

const patchJson = (json, patch) => {
  try {
    return jsonpatch.apply_patch(json, patch);
  } catch (err) {
    throw err;
  }
};

export default patchJson;
