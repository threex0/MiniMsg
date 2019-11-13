var messages = {
    data: function(){
        return {
            msgStack: []
        }
    }
}

Vue.component('post-message', {
    mixins: [api],
    data: function(){
        return {
            title: null,
            body: null
        }
    },
    props: {
        messages: Array,
    },
    template: `
    <div class="field container">
        <div class="panel-heading">Make Post</div>
        <div class="control">
            <input class="input" type="text" placeholder="Title" v-model="title">
        </div>                    
        <div class="control">
            <textarea class="textarea" placeholder="Textarea" v-model="body">Test</textarea>
        </div>
        <a class="button" @click="makePost(title, body)">Post</a>
    </div>                
    `
});

Vue.component('read-message', {
    props: ['title','body'],
    data: function(){
        return {
            hidden: false
        }
    },
    methods: {
        hide: function(){
            this.hidden = true;
        },
        unHide: function(){
            this.hidden = false;
        }
    },
    template: `
    <article class="message">
        <div class="message-header">
            <p>{{title}}</p>
            <button class="button is-small" aria-label="delete" @click="hide()" v-if="!hidden">
                <span class="icon is-small">
                    <i class="fas fa-minus"></i>
                </span>
            </button>
            <button class="button is-small" aria-label="delete" @click="unHide()" v-if="hidden">
                <span class="icon is-small">
                    <i class="fas fa-plus"></i>
                </span>
            </button>
        </div>
        <div class="message-body" v-if="!hidden">{{body}}</div>
    </article>
    `
});

Vue.component('read-messages', {
    props: {
        messages: Array
    },
    template: `
    <div class="column">
        <read-message :title="msg.title" :body="msg.body" v-for="msg in messages" :key="msg.id"></read-message>
    </div>
    `
});