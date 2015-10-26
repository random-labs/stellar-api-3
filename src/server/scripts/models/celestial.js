import thinky from '../thinky';

const type = thinky.type;

const Celestial = thinky.createModel('Celestial', {
    id: type.string(),
    alternate_id: type.any(),
    name: type.string().required(),
    other_names: type.array(),
    x: type.number().required(),
    y: type.number().required(),
    z: type.number().required(),
    luminosity: type.number(),
    colorb_v: type.number(),
    absolute_magnitude: type.number(),
    apparent_magnitude: type.number(),
    dist_ly: type.number().min(0),
    type: type.string().required()
});

export default Celestial;
