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
	 'accession_user_defined__boolean_1_'
	 ]
    }

// 	'accession_user_defined_':
// 	[
// 	 'Authorization Received (True/False)',
// 	 'Voyager Bib ID',

// 	 'User Defined (in use)'
//      ]


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
    $('#yalepa_toggle_button').html(this.showingSimplified() ? 'Show Full Form' : 'Show Simplified Form');
};

SimplifiedAccessionForm.prototype.setupLink = function() {
    var self = this;

    var $li = $('<li>');
    var $a = $('<a>').attr('href', 'javascript:void(0)').attr('id', 'yalepa_toggle_button');

    $li.append($a);
    $('#other-dropdown > .dropdown-menu').append($li);
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
