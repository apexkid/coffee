var viewModel = {
  // /// 1
  flash: ko.observable(),
  // /// 2
  shownOnce: ko.observable(),
  // /// 3
  currentPage: ko.observable(),
  // /// 4
  errors: ko.observableArray(),
  // /// 5
  items: ko.observableArray(),

  comments: ko.observableArray(),
  // /// 6
  selectedItem: ko.observable(),
  // /// 7
  newcontent: ko.observable(),

  beanid: ko.observable(0),

  searchQuery: ko.observable("dsad"),

  tempItem: {
    id: ko.observable(),
    title: ko.observable(),
    body: ko.observable(),
    country: ko.observable(),
    likes: ko.observable(),
    updated_at: ko.observable(),
    created_at: ko.observable()
  },

  tempComment: {
    content: ko.observable(),
  },

  newcomment: {
    post_id: "",
    content: ""
  },

  newCommentContent: ko.observable(),

  

  addComment: function() {
    this.newcomment.post_id = this.beanid();
    this.newcomment.content = this.newcontent();
    var json_data = ko.toJS(this.newcomment);
    json_data.post_id = 2;
    json_data.content = "vkfhvnkjdkvd vjfdmv";
    $.ajax({
      type: 'POST',
      url: '/posts/' + this.beanid() + '/comments.json',
      data: {
        // /// 17
        post: json_data
      },
      dataType: "json",
      success: function(createdItem) {
        viewModel.errors([]);
        viewModel.setFlash('Comment successfully created.');
      },
      error: function(msg) {
        viewModel.errors(JSON.parse(msg.responseText));
      }
    });
    alert("id" + this.newcomment.post_id + " " + json_data.content + " comm   " + this.newcontent());
  },
  // /// 8
  setFlash: function(flash) {
    this.flash(flash);
    this.shownOnce(false);
  },
  // /// 9
  checkFlash: function() {
    if (this.shownOnce() == true) {
      this.flash('');
    }
  },
  // /// 10
  clearTempItem: function() {
    this.tempItem.id('');
    this.tempItem.title('');
    this.tempItem.body('');
    this.tempItem.country('');
    this.tempItem.likes('');
    this.tempItem.updated_at('');
    this.tempItem.created_at('');
  },

  clearComments: function() {
    this.comments('');
  },
  // /// 11
  prepareTempItem : function() {
    this.tempItem.id(ko.utils.unwrapObservable(this.selectedItem().id));
    this.tempItem.title(ko.utils.unwrapObservable(this.selectedItem().title));
    this.tempItem.body(ko.utils.unwrapObservable(this.selectedItem().body));
    this.tempItem.country(ko.utils.unwrapObservable(this.selectedItem().country));
    this.tempItem.likes(ko.utils.unwrapObservable(this.selectedItem().likes));
    this.tempItem.updated_at(ko.utils.unwrapObservable(this.selectedItem().updated_at));
    this.tempItem.created_at(ko.utils.unwrapObservable(this.selectedItem().created_at));
  },
  // /// 12
  indexAction: function() {
    this.checkFlash();
    this.clearComments();
    $.getJSON('/posts.json', function(data) {
      viewModel.items(data);
      viewModel.currentPage('index');
      viewModel.shownOnce(true);
    });
  },

  // /// 13
  showAction: function(itemToShow) {
    this.checkFlash();
    this.errors([]);
    this.selectedItem(itemToShow);
    this.prepareTempItem();
    var url = '/posts/' + itemToShow.id + '/comments.json';
    $.getJSON(url, function(data) {
      viewModel.comments(data);
    });
    this.currentPage('show');
    this.shownOnce(true);
    this.beanid(itemToShow.id);
  },
  // /// 14
  newAction: function() {
    this.checkFlash();
    this.currentPage('new');
    this.clearTempItem();
    this.shownOnce(true);
  },
  // /// 15
  editAction: function(itemToEdit) {
    this.checkFlash();
    this.selectedItem(itemToEdit);
    this.prepareTempItem();
    this.currentPage('edit');
    this.shownOnce(true);
  },
  // /// 16
  createAction: function(itemToCreate) {
    var json_data = ko.toJS(itemToCreate);
    $.ajax({
      type: 'POST',
      url: '/posts.json',
      data: {
        // /// 17
        post: json_data
      },
      dataType: "json",
      success: function(createdItem) {
        viewModel.errors([]);
        viewModel.setFlash('Post successfully created.');
        viewModel.clearTempItem();
        viewModel.showAction(createdItem);
      },
      error: function(msg) {
        viewModel.errors(JSON.parse(msg.responseText));
      }
    });
  },

  tryAction: function(itemToUpdate) {
    itemToUpdate.likes(itemToUpdate.likes() + 1);
    var temp = 0;
    var json_data = ko.toJS(itemToUpdate);
    delete json_data.id;
    delete json_data.created_at;
    delete json_data.updated_at;

    $.ajax({
      type: 'PUT',
      url: '/posts/' + itemToUpdate.id() + '.json',
      data: {
        post: json_data
      },
      dataType: "json",
      success: function(updatedItem) {
        viewModel.errors([]);
        viewModel.setFlash('Coffee successfully tried');
        viewModel.showAction(updatedItem);
        this.temp(1);
      },
      error: function(msg) {
        viewModel.errors(JSON.parse(msg.responseText));
      }
    });  

  },
  // /// 18
  updateAction: function(itemToUpdate) {
    var json_data = ko.toJS(itemToUpdate);
    delete json_data.id;
    delete json_data.created_at;
    delete json_data.updated_at;

    $.ajax({
      type: 'PUT',
      url: '/posts/' + itemToUpdate.id() + '.json',
      data: {
        post: json_data
      },
      dataType: "json",
      success: function(updatedItem) {
        viewModel.errors([]);
        viewModel.setFlash('Post successfully updated.');
        viewModel.showAction(updatedItem);
      },
      error: function(msg) {
        viewModel.errors(JSON.parse(msg.responseText));
      }
    });
  },
  // /// 19
  destroyAction: function(itemToDestroy) {
    if (confirm('Are you sure?')) {
      $.ajax({
        type: "DELETE",
        url: '/posts/' + itemToDestroy.id + '.json',
        dataType: "json",
        success: function(){
          viewModel.errors([]);
          viewModel.setFlash('Post successfully deleted.');
          viewModel.indexAction();
        },
        error: function(msg) {
          viewModel.errors(JSON.parse(msg.responseText));
        }
      });
    }
  }
};

// /// 20
$(document).ready(function() {
  ko.applyBindings(viewModel);
  viewModel.indexAction();
  viewModel.clearTempItem();
});
