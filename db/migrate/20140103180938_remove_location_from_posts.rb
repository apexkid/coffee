class RemoveLocationFromPosts < ActiveRecord::Migration
  def self.up
    remove_column :posts, :location
  end

  def self.down
    add_column :posts, :location, :string
  end
end
