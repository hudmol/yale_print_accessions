ArchivesSpace::Application.routes.draw do
  [AppConfig[:frontend_proxy_prefix], AppConfig[:frontend_prefix]].uniq.each do |prefix|
    scope prefix do
      match('/plugins/yale_print_accessions/in_process_slip/:id' => 'yale_print_accessions#in_process_slip', :via => [:get])
    end
  end
end
