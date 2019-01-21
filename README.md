# Yale Print Accessions

An ArchivesSpace plugin providing custom Accession print options for Yale University.

## Getting Started

Download the latest release from the Releases tab in Github:

  https://github.com/hudmol/yale_print_accessions/releases

Unzip the release and move it to:

    /path/to/archivesspace/plugins

Unzip it:

    $ cd /path/to/archivesspace/plugins
    $ unzip yale_print_accessions.zip -d yale_print_accessions

Enable the plugin by editing the file in `config/config.rb`:

    AppConfig[:plugins] = ['some_plugin', 'yale_print_accessions']

(Make sure you uncomment this line (i.e., remove the leading '#' if present))

See also:

  https://github.com/archivesspace/archivesspace/blob/master/plugins/README.md