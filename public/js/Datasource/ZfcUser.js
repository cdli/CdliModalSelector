ModalSelector.Datasource.ZfcUser = function(config) {
    this.config = config;
}

ModalSelector.Datasource.ZfcUser.prototype.config = {};

ModalSelector.Datasource.ZfcUser.prototype.get = function()
{
    var obj = this;
    var dataSet = [];
    var url = this.config.basepath + '/api/cdli-modal-selector/ds/zfcuser';
    $.ajax({
        url: url,
        dataType: 'json',
        async: false,
        success: function(data) {
            $.each(data.resultset, function(k,v){
                var display = obj.config.format;
                $.each(v, function(uk,uv){
                    display = display.replace('%'+uk+'%',uv);
                });
                dataSet.push({id:v.user_id, label:display});
            });
        }
    });
    return dataSet;
}
