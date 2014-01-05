class CommentsController < ApplicationController
	def index
		@post = Post.find_by_id(params[:post_id])
		@comments = @post.comments
		
		respond_to do |format|
      		format.json { render :json => @comments }
      		format.html # index.html.erb
      	end
    end

	def new
		@post = Post.find_by_id(params[:post_id])
    	@comment = @post.comments.build
    	respond_to do |format|
      		format.html # new.html.erb
   	 	end
  	end

	def create
		@post = Post.find_by_id(params[:post_id])
		@comment = @post.comments.build(params[:comment])

    	respond_to do |format|
      		if @comment.save
        		format.html { redirect_to(@post, :notice => 'Comment was successfully added') }
        		# /// 3
        		format.json { render :json => @comment}
      		else
        		format.html { render :action => "new" }
        		# /// 4
        		format.json { render :json => @comment.errors.to_a, :status => :unprocessable_entity }
      		end
      	end
		#@comment = @post.microposts.build(params[:micropost])
		#if @micropost.save
		#	flash[:success] = "Micropost created!"
		#	redirect_to root_path
		#else

		#end
	end

	def destroy
	end
end