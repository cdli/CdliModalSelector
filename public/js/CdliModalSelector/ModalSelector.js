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
    if ( typeof this.config.preamble != 'undefined' ) {
       modalTemplate += this.config.preamble;
    }
    modalTemplate    += '    <p>Filter: <input type="text" class="input-xlarge" style="width:89%" name="ModalSelectorFilter" /></p>';
    modalTemplate    += '    <div class="selectorlist" style="margin-left:20px;">';
    modalTemplate    += '    </div>';
    modalTemplate    += '  </div>';
    modalTemplate    += '  <div class="modal-footer">';
    if (this.config.options.multiselect) {
        modalTemplate    += '    <a class="btn btn-primary btn-modalselector-finish">'+this.config.actionButton.title+'</a>';
    }
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
        if (!us.config.options.multiselect) {
            $(us.config.idSelector).find('.modal-body .selectorlist div.row[data-itemid]').click(function(){
                us.config.actionButton.callback(us, $(this));
            });
        }
    });

    $(this.config.idSelector).find('input[name=ModalSelectorFilter]').keyup(function(){
        var query = $(this).val();
        var list = us.getModal().find('.modal-body .selectorlist');
        var pattern = new RegExp(query,'ig');
        list.find('>div.row[data-itemid]').each(function() {
            if(query.length == 0 || pattern.test($(this).find('span.displayname').html())) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    if (this.config.options.multiselect) {
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
}

ModalSelector.prototype.getModal = function() {
    return $(this.config.idSelector);
}

ModalSelector.prototype.show   = function() { this.getModal().modal('show'); }
ModalSelector.prototype.hide   = function() { this.getModal().modal('hide'); }
ModalSelector.prototype.toggle = function() { this.getModal().modal('toggle'); }

ModalSelector.prototype.renderSelectorList = function() {
    var us = this;
    var domUserList = this.getModal().find('.modal-body .selectorlist');

    domUserList.html('');
    $.each(this.datasource.get(), function(k,v) {

        var htmlRow = '<div class="row" data-itemid="'+v.id+'" style="padding:3px 0">';
        if ( us.config.options.multiselect ) { 
            htmlRow    += '<input type="checkbox" name="ModalSelectorSelected" value="'+v.id+'" />&nbsp;';
            htmlRow    += '<span class="displayname">'+v.label+'</span>';
        } else {
            htmlRow    += '<span style="cursor:pointer" class="displayname">'+v.label+'</span>';
        }
        htmlRow    += '</div>';

        domUserList.append(htmlRow);
    });
}
