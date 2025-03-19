export const shopApprovalTemplate = (
  recipientEmail: string,
  shopName: string,
  url: string
) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <p>Hi ${recipientEmail},</p>
      <p>Welcome back to VillageDeals 👋!</p>
      <p>Your request to register the shop <strong>${shopName}</strong> has been approved. You can log in to your shop using the link below:</p>
      <p>
        <a href="${url}" 
          style="display: inline-block; background-color: #4CAF50; color: white; 
                 padding: 10px 20px; text-decoration: none; border-radius: 4px;">
          Login to ${shopName}
        </a>
      </p>
      <p style="margin-top: 20px;">If the button doesn’t work, copy and paste this link into your browser:</p>
      <p><a href="${url}">${url}</a></p>
      <p style="margin-top: 30px;">Best regards,<br>VillageDeals Team</p>
    </div>
  `;
};
