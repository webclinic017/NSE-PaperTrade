import Vue from 'vue'
// import dayjs from 'dayjs';
// import DropDown from "../components/ui/DropDown";
// import tooltip from "../components/ui/ToolTip"


// Vue.component("DropDown", DropDown);
// Vue.component("tooltip", tooltip);
// Vue.filter('formatDate', function (value) {
//     if (value) {
//         return dayjs(value, ["YYYY", "YYYY-MM-DD"], 'in', true);
//         //moment(String(value)).format('MM/DD/YYYY hh:mm')
//     }
// });
//export * from './resource'
//export * from './utilitymixins';

// Resource.install = function (Vue) {
// 	Vue.prototype.$getConst = (key) => {
// 		return Resource[key];
// 	}
// };

const Drag = {
    Clone : function(){
        console.log("Clone Called");

    },
	Move : function(item){

        console.log('Movedsfasdf  called :>> ');
    }
};

export default Drag;
