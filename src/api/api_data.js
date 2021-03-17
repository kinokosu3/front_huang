import * as API from './'
export default {
    getPatientData: params => {
        return API.GET('api/patient', params);
    },
    editPatientData: params =>{
        return API.POST('api/patient/edit',params);
    },
    newPatientData: params =>{
        return API.POST('api/patient/new', params);
    },
    deletePatientData: params =>{
        return API.POST('api/patient/delete', params);
    },
    Get: (url,params) =>{
        return API.GET(url, params);
    },
    Post: (url, params) =>{
        return API.POST(url, params);
    }
}