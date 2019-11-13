var api = {
    methods: {
        makePost: function(title, body){
            axios.post('http://localhost:8080', {
                postMessage: {
                    title: title,
                    body: body
                }
            }).then( (response) => {
                console.log(response);
                this.$emit('refresh');
            }).catch( (error) => {
                console.log(error);
            })
        },
        loadPosts: function(){
            axios.get('http://localhost:8080').then( (response) => {
                console.log(response);
                this.msgStack = response.data;
            });
        }
    }
}