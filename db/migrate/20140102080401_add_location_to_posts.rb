class AddLocationToPosts < ActiveRecord::Migration
  def self.up
    add_column :posts, :location, :string
  end

  def self.down
    remove_column :posts, :location
  end
end
