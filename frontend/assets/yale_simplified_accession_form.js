function SimplifiedAccessionForm() {
    this.showSections =
	[
	 'basic_information',
	 'accession_dates_',
	 'accession_extents_',
	 'accession_linked_agents_',
	 'accession_related_accessions_',
	 'accession_user_defined_',
	 'accession_material_types_',
	 'accession_payment_summary_'
	 ];

    this.showFields =
    {
	'basic_information':
	[
	 'accession_title_',
	 'accession_id_0_',
	 'accession_accession_date_',
	 'accession_general_note_',
	 'accession_acquisition_type_',
	 'accession_resource_type_'
 	 ],
 	'accession_user_defined_':
 	[
	 'accession_user_defined__boolean_1_',
	 'accession_user_defined__boolean_2_',
	 'accession_user_defined__real_1_',
	 'accession_user_defined__string_1_',
	 'accession_user_defined__string_2_',
	 'accession_user_defined__string_3_',
	 'accession_user_defined__string_4_',
	 'accession_user_defined__text_1_',
	 'accession_user_defined__text_2_',
	 'accession_user_defined__text_3_',
	 'accession_user_defined__text_4_',
	 'accession_user_defined__text_5_',
	 'accession_user_defined__date_1_',
	 'accession_user_defined__date_2_',
	 'accession_user_defined__enum_1_',
	 'accession_user_defined__enum_2_'
	 ]
    }

    this.setupLink();

    if (this.showingSimplified()) {
	this.showSimplifiedForm();
    }
}

SimplifiedAccessionForm.prototype.showingSimplified = function() {
    var showing_simplified = localStorage.getItem('yalepa_showing_simplified');

     if (showing_simplified == undefined) {
 	showing_simplified = 'off';
 	localStorage.setItem('yalepa_showing_simplified', showing_simplified);
     }

    return showing_simplified == 'on' ? true : false;
};

SimplifiedAccessionForm.prototype.setButtonLabel = function() {
    var icon = this.showingSimplified() ? 'glyphicon-resize-full' : 'glyphicon-resize-small';
    $('#yalepa_toggle_button').html('');
    $('#yalepa_toggle_button').append(this.showingSimplified() ? 'Show Full Form' : 'Show Simplified Form');
    $('#yalepa_toggle_button').append($('<span>').addClass('pull-right glyphicon ' + icon));
};

SimplifiedAccessionForm.prototype.setupLink = function() {
    var self = this;

    var $ul = $('<ul>').addClass('as-nav-list nav').css('margin-bottom', '10px');
    var $li = $('<li>');
    var $a = $('<a>').attr('href', 'javascript:void(0)').attr('id', 'yalepa_toggle_button');

    $li.append($a);
    $ul.append($li);
    $('#archivesSpaceSidebar').prepend($ul);
    this.setButtonLabel();

    $a.on('click', function() {
	    self.toggleSimplifiedForm();
	})
};

SimplifiedAccessionForm.prototype.toggleSimplifiedForm = function() {
    if (this.showingSimplified()) {
	this.showFullForm();
	localStorage.setItem('yalepa_showing_simplified', 'off');
    } else {
	this.showSimplifiedForm();
	localStorage.setItem('yalepa_showing_simplified', 'on');
    }
    this.setButtonLabel();
};

SimplifiedAccessionForm.prototype.showFullForm = function() {
    $('section').show();
    $('#archivesSpaceSidebar').find('li').show();
    $('.form-group').show();
    $(document).off('.yalepa');
};

SimplifiedAccessionForm.prototype.showSimplifiedForm = function() {
    self = this;

    $('section').each(function(idx, section) {
	sectionId = $(section).attr('id');
	if (!self.showSections.includes(sectionId)) {
	    $(section).hide();
	    $('.sidebar-entry-' + sectionId).hide();
	}

	if (self.showFields[sectionId] !== undefined) {
	    $(section).find('.form-group').hide();

	    $(self.showFields[sectionId]).each(function(idx, field) {
		$(section).find('#' + field).closest('.form-group').show();
	    });
	}
    });

    $(document).on("subrecordcreated.aspace", function(event, object_name, subform) {
	sectionId = 'accession_' + object_name + '_';

	if (self.showFields[sectionId] !== undefined) {
	    $(document).triggerHandler('simplifiablesubrecordcreated.yalepa', [subform, self.showFields[sectionId]]);
	}
    });

    $(document).on("simplifiablesubrecordcreated.yalepa", function(event, subform, fields) {
	$(subform).find('.form-group').hide();

	$(fields).each(function(idx, field) {
	    $(subform).find('#' + field).closest('.form-group').show();
	});
    });
};


$(document).ready(function() {
    new SimplifiedAccessionForm();
});
