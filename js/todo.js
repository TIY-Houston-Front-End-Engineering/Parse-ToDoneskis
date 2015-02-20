;(function(exports){

    "use strict";

    Parse.TodoRouter = Parse.Router.extend({
        initialize: function(){
            this.collection = new Parse.TodoList();

            this.view = new Parse.TodoView({
                collection: this.collection
            });

            this.collection.fetch();

            Parse.history.start();
        },
        routes: {
            "*default": "home"
        },
        home: function(){
            this.view.render();
        }
    })

    Parse.TodoView = Parse.TemplateView.extend({
        el: ".container",
        view: "app",
        events: {
            "submit form": "addTask",
            "change input[name='urgent']": "toggleUrgent",
            "change input[name='isDone']": "toggleIsDone",
            "keyup .description": "setDescription"
        },
        addTask: function(e){
            e.preventDefault();
            var data = {
                description: this.el.querySelector('input').value
            }
            this.collection.create(data);
        },
        getModelAssociatedWithEvent: function(e){
            var el = e.target,
                li = $(el).closest('li').get(0),
                id = li.getAttribute('id'),
                m = this.collection.get(id);

            return m;
        },
        toggleUrgent: function(e){
            var m = this.getModelAssociatedWithEvent(e);
            if(m){
                m.set('urgent', !m.get('urgent'));
                this.collection.sort();
                this.render();
            }
        },
        toggleIsDone: function(e){
            var m = this.getModelAssociatedWithEvent(e);
            if(m){
                m.set('isDone', !m.get('isDone'));
                if(m.get('isDone')){ // if setting to 'done', set 'urgent' to false
                    m.set('urgent', false);
                }
                this.collection.sort();
                this.render();
            }
        },
        setDescription: function(e){
            var m = this.getModelAssociatedWithEvent(e);
            if(m){
                m.set('description', e.target.innerText);
                m.save();
            }
        }
    })

    Parse.Task = Parse.Object.extend({
        className: "Task",
        defaults: {
            isDone: false,
            urgent: false,
            dueDate: null,
            tags: [],
            description: "no description given"
        },
        initialize: function(){
            this.on("change", function(){
                this.save();
            })
        }
    })

    Parse.TodoList = Parse.Collection.extend({
        model: Parse.Task,
        comparator: function(a, b){
            // if a is 'urgent', -1 (a comes before b)
            if(a.get('urgent') && !b.get('urgent') || !a.get('isDone') && b.get('isDone')) return -1;
            // if a 'isDone', 1 (a comes after b)
            if(a.get('isDone') && !b.get('isDone') || !a.get('urgent') && b.get('urgent')) return 1;

            return a.get('description') > b.get('description') ? 1 : -1;
        }
    })

})(typeof module === "object" ? module.exports : window)