class YalePrintAccessionsController < ApplicationController
  
  set_access_control  "view_repository" => [:in_process_slip]

  layout 'yale_accession_print'

  def in_process_slip
    @accession = Accession.find(params[:id], find_opts)
    @print = params[:print] != '0'
    render template: 'accessions/in_process_slip'
  end

end

