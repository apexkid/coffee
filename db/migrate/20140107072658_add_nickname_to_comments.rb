class AddNicknameToComments < ActiveRecord::Migration
  def self.up
    add_column :comments, :nickname, :string
  end

  def self.down
    remove_column :comments, :nickname
  end
end
