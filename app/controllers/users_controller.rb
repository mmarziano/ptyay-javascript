class UsersController < ApplicationController
    layout "main"
    

    ADMIN_PIN = "1234"

    def index
    end 

    def new
        @user = User.new
    end 

    def create 
        if @user = User.find_by(email: params[:email]) 
            flash[:message] = "Account found. Please login in."
            redirect_to '/'
        else
            @user = User.new(user_params)
            @user.admin = true if params[:user][:admin_pin] == ADMIN_PIN
            @household = @user.build_household(school_id: params[:user][:school_id])
                if @user.save 
                    log_in(@user)
                    render :show
                else 
                    @user.errors.full_messages.inspect
                    render :new
                end  
            end
    end 

    def complete_profile
        @user = User.find(params[:user][:user_id]) 
        @user.admin = true if params[:user][:admin_pin] == ADMIN_PIN
        @user.school_id = params[:user][:school_id]
        @household = @user.build_household(school_id: params[:user][:school_id])
                if @user.save 
                    log_in(@user)
                    render :show
                else 
                    @user.errors.full_messages.inspect
                    render :new
                end  
     end 

    def get_user 
      @user = User.find(current_user.id)
      render json: @user  
    end 

    def show 
        @user = User.find(params[:id])
        @fundraiser = Fundraiser.new
        @household = @user.household
    end 

    def edit 
        @user = User.find(params[:id])
    end

    def update
        @user = User.find(params[:id])
        if @user.update(user_params)
            redirect_to user_path(@user)
        else 
            @user.errors.full_messages.inspect
            render :show
        end
    end 

     

private 

    def user_params
        params.require(:user).permit(:username, :email, :password, :first_name, :last_name, :school_id, :household_id, :admin_pin, :household => [:students_attributes => [:first_name, :last_name, :grade]])
    end 

    def require_login
        unless logged_in?
          redirect_to '/'
        end
    end

end