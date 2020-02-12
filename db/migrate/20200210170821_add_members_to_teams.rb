class AddMembersToTeams < ActiveRecord::Migration[6.0]
  def change
    add_column :teams, :members_ids, :bigint, array: true, default: []
  end
end
