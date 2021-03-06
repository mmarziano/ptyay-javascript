class CommentsController < ApplicationController
    layout "main"

    before_action :my_comment?, only: [:edit, :show, :update,]
    before_action :is_admin?, only: :index

    def index 
        @comments = Comment.select {|c| c.fundraiser.school == current_user.school}
    end 
    
    def new
        @comment = Comment.new
    end 

    def create
        @comment = Comment.new(text: params[:comment], fundraiser_id: params[:fundraiser_id])
        @comment.user_id = current_user.id
        @fundraiser = Fundraiser.find(params[:fundraiser_id])
        if @comment.save
            redirect_to fundraiser_path(@fundraiser)
        end
    end 

    def edit
        @comment = Comment.find(params[:id])
        @fundraiser = @comment.fundraiser
    end 

    def update
        @comment = Comment.find(params[:id])
        if @comment.user == current_user 
            @comment.text = params[:comment]
            @comment.save

            redirect_to fundraiser_path(@comment.fundraiser)
        else 
            flash[:alert] = "Cannot edit another user's comments."
            redirect_to fundraiser_path(@comment.fundraiser)
        end 
    end 

    def destroy
        @fundraiser = Fundraiser.find(params[:fundraiser_id])
        @comment = Comment.find(params[:id])
        if @comment.user == current_user || current_user.admin == true && current_user.school == @fundraiser.school
            @comment.destroy
            redirect_to fundraiser_path(@fundraiser)
        else 
            flash[:alert] = "Unable to delete."
            redirect_to user_path(current_user)
        end
    end 

  
end
