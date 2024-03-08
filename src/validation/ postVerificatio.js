import {create,test,enforce} from 'vest';

const suite = create ((data = {} => {
test("username","username is required", ()=>{
    enforce(data.username).isNotBlank
})

}));

export default suite;