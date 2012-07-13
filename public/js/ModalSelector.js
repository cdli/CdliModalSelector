var ModalSelector = function(config) {
    this.config = config;
}

ModalSelector.Datasource = {};
ModalSelector.prototype.config = {};
ModalSelector.prototype.datasource = {};

ModalSelector.prototype.init = function() {
    this.config.idSelector = '#'+this.config.id;
    this.datasource = new ModalSelector.Datasource[this.config.datasource.name](this.config.datasource.options);

    var modalTemplate = '<div class="modal hide fade" id="'+this.config.id+'">';
    modalTemplate    += '  <div class="modal-header"><h3>'+this.config.title+'</h3></div>';
    modalTemplate    += '  <div class="modal-body">';
    modalTemplate    += '    <p>Filter: <input type="text" class="input-xlarge" style="width:89%" name="ModalSelectorFilter" /></p>';
    modalTemplate    += '    <div class="selectorlist" style="margin-left:20px;">';
    modalTemplate    += '    </div>';
    modalTemplate    += '  </div>';
    modalTemplate    += '  <div class="modal-footer">';
    modalTemplate    += '    <a class="btn btn-primary btn-modalselector-finish">'+this.config.actionButton.title+'</a>';
    modalTemplate    += '    <a class="btn" data-dismiss="modal">Close</a>';
    modalTemplate    += '  </div>';
    modalTemplate    += '</div>';

    $(this.config.idSelector).remove();
    $('body').append(modalTemplate);
    $(this.config.idSelector).modal({
        show: false
    });

    var us = this;
    $(this.config.idSelector).on('show', function() {
        us.renderSelectorList();
    });

    $(this.config.idSelector).find('input[name=ModalSelectorFilter]').keyup(function(){
        var query = $(this).val();
        var list = us.getModal().find('.modal-body .selectorlist');
        var pattern = new RegExp(query,'ig');
        list.find('>div.row[data-userid]').each(function() {
            if(query.length == 0 || pattern.test($(this).find('span.displayname').html())) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $(this.config.idSelector).find('.btn.btn-modalselector-finish').click(function() {
        var selected = [];
        $(us.config.idSelector).find('input[type=checkbox]').each(function(k,v) {
            if ($(v).attr('checked') == 'checked') {
                selected.push($(v).val());
            }
        });
        us.config.actionButton.callback(us,selected);
    });
}

ModalSelector.prototype.getModal = function() {
    return $(this.config.idSelector);
}

ModalSelector.prototype.show   = function() { this.getModal().modal('show'); }
ModalSelector.prototype.hide   = function() { this.getModal().modal('hide'); }
ModalSelector.prototype.toggle = function() { this.getModal().modal('toggle'); }

ModalSelector.prototype.renderSelectorList = function() {
    var domUserList = this.getModal().find('.modal-body .selectorlist');

    domUserList.html('');
    $.each(this.datasource.get(), function(k,v) {
        domUserList.append('<div class="row" data-userid="'+v.id+'" style="padding:3px 0"><input type="checkbox" name="ModalSelectorSelected" value="'+v.id+'" />&nbsp;<span class="displayname">'+v.label+'</span></div>');
    });
}
