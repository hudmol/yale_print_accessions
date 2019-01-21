function InProgressSlip() {
    this.name = 'yaleAccessionPrint_inprocess_slip';
    this.linkId = this.name + '_link';
    this.iframeId = this.name + '_iframe';

    this.setupLink();
}

InProgressSlip.prototype.setupLink = function() {
    var self = this;

    var $li = $('<li>');
    var $a = $('<a>').attr('href', 'javascript:void(0)').attr('id', self.linkId).html('Print in-process slip');

    $li.append($a);
    $('#other-dropdown > .dropdown-menu').append($li);

    $a.on('click', function() {
        self.print();
    })
};

InProgressSlip.prototype.print = function() {
    $('#'+this.name).remove();

    var $iframe = $('<iframe id="' + this.name + '" name="' + this.name + '"></iframe>');

    var path = APP_PATH + 'plugins/yale_print_accessions/in_process_slip/' + ACCESSION_ID;

    $.get(path, function(html) {
        if ("srcdoc" in document.createElement("iframe")) {
            $iframe.attr('srcdoc', html);
        } else {
            $iframe.attr('src', 'data:text/html;charset=utf-8,' + encodeURI(html));
        }

        $iframe.addClass('hide');

        $(document.body).append($iframe);
    });
};


$(document).ready(function() {
    new InProgressSlip();
});